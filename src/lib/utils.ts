import { QuestionType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function sliceArrayByPercentage(array: any[], percentage: number) {
  // Calculate the number of elements to slice based on the percentage

  // if (!array || !array.length) return

  const sliceIndex = Math.ceil((array.length * percentage) / 100);

  // Return the sliced array
  return array.slice(0, sliceIndex);
}

export function formatNumber(number: number) {
  const units = [
    "",
    "tys",
    "mln",
    "mld",
    "bln",
    "bld",
    "trln",
    "trlrd",
    "kwrdln",
    "kwrldrd",
    "kwnl",
    "kwnlrd",
  ]; // Możesz rozszerzyć w zależności od potrzeb
  let unitIndex = 0;

  while (number >= 1000 && unitIndex < units.length - 1) {
    number /= 1000;
    unitIndex++;
  }

  return `${Math.round(number * 10) / 10}${units[unitIndex]}`;
}

export function formatTime(time: number) {
  const units = ["y", "d", "h", "m", "s"];
  const unitNames = ["year", "day", "hour", "minute", "second"];
  const formattedTime: string[] = [];

  for (let i = 0; i < units.length; i++) {
    if (time >= 31536000 && units[i] === "y") {
      const years = Math.floor(time / 31536000);
      formattedTime.push(`${years}${years > 1 ? "y" : " year"}`);
      time %= 31536000;
    } else if (time >= 86400 && units[i] === "d") {
      const days = Math.floor(time / 86400);
      formattedTime.push(`${days}${days > 1 ? "d" : " day"}`);
      time %= 86400;
    } else if (
      time >= 3600 &&
      units[i] === "h" &&
      !formattedTime.includes("y")
    ) {
      const hours = Math.floor(time / 3600);
      formattedTime.push(`${hours}${hours > 1 ? "h" : " hour"}`);
      time %= 3600;
    } else if (time >= 60 && units[i] === "m" && !formattedTime.includes("y")) {
      const minutes = Math.floor(time / 60);
      formattedTime.push(`${minutes}${minutes > 1 ? "m" : " minute"}`);
      time %= 60;
    } else if (
      units[i] === "s" &&
      formattedTime.length < 2 &&
      time !== 0 &&
      !formattedTime.includes("y")
    ) {
      formattedTime.push(`${time}${time > 1 ? "s" : " second"}`);
    }
  }

  return formattedTime.join(" ");
}

export function removeSpaces(string: string) {
  const sanitizedString = string.replace(/[^\w\s-]/gi, "");
  // Replace spaces with hyphens
  return sanitizedString.replace(/\s+/g, "-");
}
export const disableTextInInput = (e: any) => {
  const inputElement: HTMLInputElement = e.currentTarget;
  const newText = e.currentTarget.textContent;
  const regex = /^[0-9]*$/; // Regular expression to match only numbers

  if (
    !newText ||
    (newText.length === 1 && newText === "0") ||
    newText.match(/^0+$/)
  ) {
    e.currentTarget.textContent = "0";
    return;
  }
  if (newText.match(/^0+[1-9]/)) {
    e.currentTarget.textContent = newText.replace(/^0+/, "");
    return;
  }

  if (!newText || (newText.length === 1 && newText === "0")) {
    e.currentTarget.textContent = "0";
  }
  // If the entered text does not match the regex, prevent it from being added
  if (!regex.test(newText)) {
    // Prevent the default behavior of the input event (typing)
    e.preventDefault();

    // Remove non-numeric characters
    const sanitizedText = newText.replace(/\D/g, "");

    // If the resulting text is empty or NaN, or less than 0, replace it with a default value ('0')
    if (
      sanitizedText === "" ||
      isNaN(parseInt(sanitizedText)) ||
      parseInt(sanitizedText) < 0
    ) {
      e.currentTarget.textContent = "0";
    } else {
      // Otherwise, set the sanitized text
      e.currentTarget.textContent = sanitizedText;
    }
  }
};

export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0"); // Pobierz dzień miesiąca i dodaj zero z przodu, jeśli jest jednocyfrowy
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Pobierz miesiąc (od 0 do 11) i dodaj zero z przodu, jeśli jest jednocyfrowy
  const year = date.getFullYear(); // Pobierz rok (czterocyfrowy)

  return `${day}-${month}-${year}`; // Zwróć sformatowaną datę jako string w formacie "DD-MM-RRRR"
}

const userCreatedAt = new Date(); // Załóżmy, że to jest data utworzenia użytkownika
const formattedDate = formatDate(userCreatedAt); // Użyj funkcji formatDate() do sformatowania daty
// Wyświetli sformatowaną datę w formacie "DD-MM-RRRR"

export const divideLastSyllableInSentence = (sentence: string): string => {
  const words = sentence.split(" ");
  const modifiedWords = words.map((word) => {
    if (word.length > 12) {
      const lastSpaceIndex = word.lastIndexOf(" ");
      if (lastSpaceIndex !== -1) {
        const lastSyllableIndex = word
          .slice(lastSpaceIndex + 1)
          .lastIndexOf("-");
        if (lastSyllableIndex !== -1) {
          const beforeLastSyllable = word.slice(
            0,
            lastSpaceIndex + lastSyllableIndex,
          );
          const lastSyllable = word.slice(lastSpaceIndex + lastSyllableIndex);
          return `${beforeLastSyllable}- ${lastSyllable}`;
        }
      }
    }
    return word;
  });
  return modifiedWords.join(" ");
};

export const handleScrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};
export const handleScrollToTop = () => {
  window.scrollTo({
    top: 0, // Scroll to the top of the document
    behavior: "smooth",
  });
};

export const getTitleFromValue = (
  value: any,
  data: { title: any; value: any }[],
) => {
  const item = data.find((item) => item.value === value.toString());
  return item ? item.title : "";
};

export function daysAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Dzisiaj";
  } else if (diffInDays === 1) {
    return "Wczoraj";
  } else if (diffInDays === 2) {
    return "Przedwczoraj";
  } else if (diffInDays >= 5) {
    return `${diffInDays} dni temu`;
  } else {
    return `${diffInDays} dni temu`;
  }
}
export function slugify(text: string): string {
  const randomString = Math.random().toString(36).substring(7); // Generate a random string
  const slug = text
    .toString() // Ensure input is string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .normalize("NFD") // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple consecutive hyphens with a single hyphen

  return `${slug}-${randomString}`;
}

export const getQuestionTypeTranslation = (type: QuestionType) => {
  switch (type) {
    case "multipleChoice":
      return "Wielkorotnego wyboru";
    case "openEnded":
      return "Pytanie otwarte";
    case "sortable":
      return "Sortowalne";
    case "trueOrFalse":
      return "Prawda fałsz";
    default:
      return type; // If the type is not found, return the original type
  }
};

export function getQuestionLabel(count: number): string {
  if (count === 1) {
    return `${count} Pytanie`;
  } else if (count > 1 && count < 5) {
    return `${count} Pytania`;
  } else {
    return `${count} Pytań`;
  }
}
