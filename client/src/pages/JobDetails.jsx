import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  BriefcaseBusiness,
  Banknote,
  CalendarDays,
  Clock,
  Building2,
  Globe,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { getJobById } from "../api/getJobById"; // Adjust path to your API file
import { saveJob } from "../api/saveJob";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getJobById(id);
        setJob(data.job ?? data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "This job could not be found."
            : "Failed to load job details. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSaveJob = async (id) => {
    try {
      await saveJob(id, token);
      console.log("job saved successfully...");
    } catch (err) {
      console.log("Error saving a job", err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
          {error || "Job not found"}
        </h2>
        <button
          onClick={() => navigate("/findjobs")}
          className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Browse Jobs
        </button>
      </div>
    );
  }

  const company = job.employer;

  const salary =
    typeof job.salary === "object" && job.salary !== null
      ? `${job.salary.min ?? ""} - ${job.salary.max ?? ""}`
      : job.salary;

  const postedDate = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString()
    : "Not specified";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back navigation */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Job header */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div className="flex gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                {company?.companyLogo ? (
                  <img
                    src={company.companyLogo}
                    alt={`${company.companyName || "Company"} logo`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Building2
                    size={30}
                    className="text-blue-600 dark:text-blue-400"
                  />
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {job.title}
                </h1>

                <p className="mt-2 font-medium text-slate-600 dark:text-slate-300">
                  {company?.companyName || "Company"}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {/* Job status either open or closed */}
                  {job.status && (
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        job.status === "open"
                          ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {job.status === "open" ? "Open" : "Closed"}
                    </span>
                  )}

                  {/* Job  type full time or part time  */}
                  {job.type && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                      {job.type}
                    </span>
                  )}

                  {job.category && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {job.category}
                    </span>
                  )}

                  {job.experienceLevel && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {job.experienceLevel}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              aria-label="Save job"
              onClick={() => handleSaveJob(id)}
              className="self-start rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-blue-500/10"
              title="Save job"
            >
              <Bookmark size={20} />
            </button>
          </div>
        </section>

        {/* Main content and sidebar */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Job description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Job Description
              </h2>

              <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                {job.description || "No job description provided."}
              </div>
            </section>

            {/* Requirements */}
            {job.requirements && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Requirements
                </h2>

                <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {Array.isArray(job.requirements)
                    ? job.requirements.join("\n")
                    : job.requirements}
                </div>
              </section>
            )}

            {/* Skills */}
            {job.skills?.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Required Skills
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-500/10 dark:text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Company information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                About the Company
              </h2>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  {company?.companyLogo ? (
                    <img
                      src={company.companyLogo}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 className="text-blue-600" size={24} />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {company?.companyName || "Company"}
                  </h3>

                  {company?.companyWebsite && (
                    <a
                      href={company.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                      <Globe size={14} />
                      Company website
                    </a>
                  )}
                </div>
              </div>

              {company?.description && (
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {company.description}
                </p>
              )}
            </section>
          </div>

          {/* Job information sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Job Overview
            </h2>

            <div className="mt-6 space-y-6">
              <div className="flex gap-3">
                <Banknote
                  className="shrink-0 text-blue-600 dark:text-blue-400"
                  size={22}
                />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Salary
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {salary || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin
                  className="shrink-0 text-blue-600 dark:text-blue-400"
                  size={22}
                />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Location
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {job.location || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <BriefcaseBusiness
                  className="shrink-0 text-blue-600 dark:text-blue-400"
                  size={22}
                />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Job Type
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {job.type || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDays
                  className="shrink-0 text-blue-600 dark:text-blue-400"
                  size={22}
                />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Date Posted
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {postedDate}
                  </p>
                </div>
              </div>

              {job.experienceLevel && (
                <div className="flex gap-3">
                  <Clock
                    className="shrink-0 text-blue-600 dark:text-blue-400"
                    size={22}
                  />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Experience Level
                    </p>
                    <p className="mt-1 font-medium capitalize text-slate-900 dark:text-white">
                      {job.experienceLevel}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {job.status === "open" ? (
              <button
                type="button"
                onClick={() => navigate(`/jobs/${id}/apply`)}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              >
                <CheckCircle2 size={18} />
                Apply Now
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="mt-8 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              >
                Applications Closed
              </button>
            )}

            <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
              Review the job requirements before applying.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default JobDetails;
