import { Link } from "react-router-dom";

export default function EmptyState({ title, description, actionLabel, actionTo }) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#d8c6ac] bg-[#fcfaf7] p-10 text-center shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">{description}</p>
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
