import { useSearchParams } from "react-router-dom";

function FindJobs() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";

  console.log(search);
  console.log(location);
  console.log(category);

  return (
    <>
      <h1 className="text-5xl font-bold">Jobs</h1>
      <p>
        {search}
        {location}
      </p>
    </>
  );
}

export default FindJobs;
