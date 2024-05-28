import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";

const ACCESSKEY = process.env.LIARA_ACCESS_KEY;
const SECRETKEY = process.env.LIARA_SECRET_KEY;
const ENDPOINT = process.env.LIARA_ENDPOINT;

const s3 = new S3({
  accessKeyId: ACCESSKEY,
  secretAccessKey: SECRETKEY,
  endpoint: ENDPOINT,
});
const db = sql("meals.db");

export async function getMeals() {
  //faking fetch time
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //.all() return every thing
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "nextlevelfood",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
      INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
    `
  ).run(meal);
}
