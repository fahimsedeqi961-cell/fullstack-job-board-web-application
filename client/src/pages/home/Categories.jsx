import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import {
  Code2,
  Palette,
  Megaphone,
  Briefcase,
  HeartPulse,
  GraduationCap,
  Headphones,
  Layers,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/categoryApi";

const ICON_MAP = {
  Engineering: Code2,
  "Software Development": Code2,
  Design: Palette,
  "UI/UX Design": Palette,
  Marketing: Megaphone,
  Sales: Megaphone,
  Finance: Briefcase,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  "Customer Support": Headphones,
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error loading categories:", err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-50/50 py-16 sm:py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Skeleton Header Area */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-pulse">
            <div className="max-w-md w-full">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3 mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-full"></div>
            </div>
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-32"></div>
          </div>

          {/* Skeleton Categories Grid */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex items-center gap-4 rounded-xl border border-slate-200/60 bg-transparent p-5 dark:border-slate-800"
              >
                {/* Skeleton Icon Box */}
                <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800"></div>

                {/* Skeleton Text Lines */}
                <div className="flex flex-col flex-1 gap-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50/50 py-16 sm:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Browse By Category
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
              Find the career path that's perfect for you, with over 200+ fresh
              job openings posted daily.
            </p>
          </div>

          <Link
            to="/categories"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>Browse all categories</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const dbName = category.category || "";
            // Find match in ICON_MAP ignoring case variations
            const matchedKey = Object.keys(ICON_MAP).find(
              (key) => key.toLowerCase() === dbName.toLowerCase().trim(),
            );
            const IconComponent = ICON_MAP[matchedKey] || Layers;
            return (
              <Link
                to={`/jobs?category=${encodeURIComponent(category.category)}`}
                key={category.id || index}
                className="group flex items-center gap-4 rounded-xl border border-slate-200/60 bg-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-lg hover:shadow-slate-100 dark:border-slate-800 dark:hover:bg-slate-900 dark:hover:shadow-none"
              >
                {/* Icon Wrapper */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                  <IconComponent size={22} />
                </div>

                {/* Content */}
                <div className="flex flex-col min-w-0">
                  <h3 className="truncate text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                    {category.category}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    {category.jobs} Jobs Available
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
