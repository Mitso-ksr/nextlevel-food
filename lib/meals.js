import sql from "better-sqlite3";

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
