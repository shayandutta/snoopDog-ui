"use client";
import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4" />,
    slug: "gloves",
  },
];

const Categories = () => {

const searchParams = useSearchParams();
const pathName = usePathname();
const router = useRouter();
const selectedCategory = searchParams.get("category");

const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all")
    router.push(`${pathName}?${params.toString()}`, {scroll: false}); //this will update the URL with the new category
    //without this, the URL will not change and the component will not re-render
}
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 mb-4 text-sm rounded-lg">
      {categories.map((category) => (
        <div
          className={`flex items-center gap-2 justify-center cursor-pointer px-2 py-1 rounded-md ${
            category.slug === selectedCategory ? "bg-white" : " text-gray-500"
          }`}
          key={category.name}
          onClick={()=>handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;

/*
 * =============================================================================
 * FLOW, USE CASE & REASON FOR EVERYTHING (Categories.tsx)
 * =============================================================================
 *
 * --- WHAT THIS COMPONENT DOES ---
 * Renders a row of category buttons (All, T-shirts, Shoes, etc.). The selected
 * category is stored in the URL so the page can filter products and the user
 * can bookmark or share a filtered view.
 *
 * --- THE FLOW (step by step) ---
 * 1. On load: we READ the URL (useSearchParams) → get "category" → store in
 *    selectedCategory → highlight the matching button.
 * 2. On click: user clicks a category → handleChange(slug) runs → we build a
 *    new URL with that category (router.push) → URL changes → component
 *    re-renders → useSearchParams sees the new URL → selectedCategory updates
 *    → the right button looks selected.
 *
 * --- WHY EACH THING IS USED ---
 *
 * useSearchParams()
 *   What: A hook that gives you the current URL query string (?key=value&...).
 *   Why:  The URL is the single source of truth for "which category is
 *         selected". We need to READ it to know which button to highlight and
 *         so other components (e.g. ProductList) can filter by category.
 *   How:  searchParams.get("category") returns the value or null.
 *
 * usePathname()
 *   What: A hook that gives you the current path only (e.g. "/" or "/products").
 *   Why:  When we update the URL in handleChange, we must keep the same path
 *         and only change the query. If we hardcoded "/", this component would
 *         break on other pages (e.g. /products). Path = "where we are".
 *   How:  We use it in router.push(`${pathName}?${params.toString()}`).
 *
 * useRouter()
 *   What: A hook that gives you a router object. router.push(url) changes the
 *         URL and navigates without a full page reload.
 *   Why:  When the user clicks a category we must WRITE the new category into
 *         the URL. Without this, the URL would never change and the app
 *         wouldn’t know the selection.
 *   How:  handleChange calls router.push(newUrl). Next.js then re-renders and
 *         useSearchParams() returns the updated query.
 *
 * selectedCategory
 *   What: The value of ?category=... in the URL (string or null).
 *   Why:  We need one variable to decide "which button is active". Comparing
 *         category.slug === selectedCategory in the JSX does that.
 *   How:  searchParams.get("category").
 *
 * URLSearchParams(searchParams) and params.set("category", ...)
 *   What: URLSearchParams is a built-in to work with query strings. We copy
 *         the current params, then set/overwrite "category".
 *   Why:  The URL might have other params (e.g. ?sort=price&page=2). If we
 *         only pushed ?category=shoes we would wipe those out. Copy → set one
 *         key → toString() keeps the rest and only changes category.
 *   How:  new URLSearchParams(searchParams), then params.set("category", value).
 *
 * router.push(..., { scroll: false })
 *   What: Second argument is options. scroll: false means "don’t scroll to top".
 *   Why:  Changing category is a small UI update. Scrolling to top would be
 *         jarring and make the user lose their place.
 *   How:  Pass { scroll: false } as the second argument to router.push.
 *
 * handleChange(value)
 *   What: A function that runs when a category is clicked. It updates the URL
 *         to include the new category (or "all" if value is null).
 *   Why:  Clicks need to trigger a single place that builds the new URL and
 *         navigates. Centralizing this keeps the logic clear and reusable.
 *   How:  onClick={() => handleChange(category.slug)} on each button.
 *
 * categories.map(...) and key={category.name}
 *   What: We loop over the categories array and render one clickable div per
 *         item. key tells React which item is which in the list.
 *   Why:  So we don’t repeat the same JSX 8 times. key is required by React
 *         for list items so it can update the DOM correctly when things change.
 *   How:  map returns an array of elements; key must be unique per item.
 *
 * category.slug === selectedCategory ? "bg-white" : "text-gray-500"
 *   What: Conditional styling: one style when this category is selected,
 *         another when it’s not.
 *   Why:  User needs to see which category is active. The URL holds the truth;
 *         we compare slug to selectedCategory (from the URL) to apply the
 *         right style.
 *   How:  Ternary inside the className string.
 *
 * --- ONE-LINE SUMMARY ---
 * Read the URL (useSearchParams, usePathname) → show the right selection →
 * on click, write the new category to the URL (router.push + URLSearchParams) →
 * URL change causes re-render → read again → UI stays in sync.
 */
