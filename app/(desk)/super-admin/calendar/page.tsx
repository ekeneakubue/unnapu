import type { Metadata } from "next";
import { diary, session } from "../data";
import { PageIntro, Panel } from "../ui";

export const metadata: Metadata = {
  title: "Calendar",
};

export default function CalendarPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5">
      <PageIntro
        kicker={`Session ${session}`}
        title="Academic calendar"
        description="Dates prepared for Senate, implemented by the University, and submitted to the Commission."
      />
      <Panel title="Forthcoming">
        <ol className="divide-y divide-unn-green/10">
          {diary.map((item) => (
            <li key={item.title} className="flex gap-5 py-4 first:pt-0 last:pb-0">
              <span className="w-14 shrink-0 font-serif text-xl font-semibold text-[#b8860b]">
                {item.date}
              </span>
              <span>
                <span className="block font-sans text-base text-unn-green">
                  {item.title}
                </span>
                <span className="mt-1 block font-sans text-sm text-unn-green/50">
                  {item.place}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
