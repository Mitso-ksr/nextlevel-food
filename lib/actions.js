"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidInput(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  "use server";
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidInput(meal.title) ||
    isInvalidInput(meal.summary) ||
    isInvalidInput(meal.instructions) ||
    isInvalidInput(meal.creator) ||
    isInvalidInput(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input",
    };
  }

  await saveMeal(meal);
  //this line tells nextjs to throw away its cached data
  // the second argument 'layout' is used to indicate that
  //we want to revalidate the path and also all its related content
  //revalidatePath("/meals", "layout");

  //because just meals was enought I added the following:
  revalidatePath("/meals");
  redirect("/meals");
}
