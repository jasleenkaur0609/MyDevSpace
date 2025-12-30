import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Line,
} from "recharts";
import { format } from "date-fns";

const USERNAME = "jasleenkaur0609";

const GithubStats = () => {
  const [yearOffset, setYearOffset] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [summary, setSummary] = useState({
    year: "",
    total: 0,
    mostActiveMonth: "",
  });
  const [topRepos, setTopRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollYRef = useRef(0);

  useEffect(() => {
    fetchGithubData();
    // eslint-disable-next-line
  }, [yearOffset]);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
    }
  }, [loading]);

  const fetchGithubData = async () => {
    try {
      setLoading(true);

      const year = new Date().getFullYear() - yearOffset;
      const from = new Date(year, 0, 1).toISOString();
      const to = new Date(year, 11, 31).toISOString();

      /* ---------- GRAPHQL (CONTRIBUTIONS) ---------- */
      const graphQuery = `
        query {
          user(login: "${USERNAME}") {
            contributionsCollection(from: "${from}", to: "${to}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      /* ---------- REST (REPOS) ---------- */
      const [graphRes, repoRes] = await Promise.all([
        fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: graphQuery }),
        }),
        fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }),
      ]);

      const graphJson = await graphRes.json();
      const repoJson = await repoRes.json();

      if (!graphJson?.data?.user) throw new Error("GitHub API error");

      const days =
        graphJson.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
          (w) => w.contributionDays
        );

      /* ---------- MONTHLY DATA ---------- */
      const months = Array.from({ length: 12 }, (_, i) => ({
        month: format(new Date(year, i, 1), "MMM"),
        count: 0,
      }));

      days.forEach((d) => {
        const m = new Date(d.date).getMonth();
        months[m].count += d.contributionCount;
      });

      /* ---------- TREND (MoM) ---------- */
      const trendData = months.map((m, i) => ({
        ...m,
        trend:
          i === 0
            ? m.count
            : Math.round((months[i - 1].count + m.count) / 2),
      }));

      /* ---------- QUARTERS ---------- */
      const q = [
        { label: "Q1", count: months.slice(0, 3).reduce((s, m) => s + m.count, 0) },
        { label: "Q2", count: months.slice(3, 6).reduce((s, m) => s + m.count, 0) },
        { label: "Q3", count: months.slice(6, 9).reduce((s, m) => s + m.count, 0) },
        { label: "Q4", count: months.slice(9, 12).reduce((s, m) => s + m.count, 0) },
      ];

      /* ---------- SUMMARY ---------- */
      const mostActive = months.reduce((a, b) =>
        b.count > a.count ? b : a
      );

      /* ---------- TOP REPOS ---------- */
      const highlights = repoJson
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3);

      setMonthlyData(trendData);
      setQuarters(q);
      setTopRepos(highlights);
      setSummary({
        year,
        total:
          graphJson.data.user.contributionsCollection.contributionCalendar
            .totalContributions,
        mostActiveMonth: mostActive.month,
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section className="py-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-white">GitHub Activity</h2>

        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full bg-cyan-500 text-black text-sm font-medium hover:scale-105 transition"
        >
          View GitHub →
        </a>
      </div>

      {/* YEAR TOGGLE */}
      <div className="flex gap-3 mb-8">
        {["Current Year", "Previous Year"].map((label, i) => (
          <button
            key={i}
            disabled={loading}
            onClick={() => {
              scrollYRef.current = window.scrollY;
              setYearOffset(i);
            }}
            className={`px-4 py-2 rounded-full text-sm transition ${
              yearOffset === i
                ? "bg-cyan-500 text-black"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            } ${loading ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CHART WITH TREND LINE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
        <p className="text-sm text-gray-400 mb-4">
          Monthly Contributions {summary.year && `(${summary.year})`}
        </p>

        <div className="h-[260px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="skeleton"
                className="h-full bg-white/10 rounded-xl animate-pulse"
              />
            ) : (
              <motion.div
                key={summary.year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid #1e293b",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {monthlyData.map((_, i) => (
                        <Cell
                          key={i}
                          fill="#22d3ee"
                          style={{
                            animation: `grow 0.4s ease ${i * 0.05}s both`,
                          }}
                        />
                      ))}
                    </Bar>
                    <Line
                      type="monotone"
                      dataKey="trend"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* QUARTERS */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {quarters.map((q) => (
          <div
            key={q.label}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
          >
            <p className="text-lg font-semibold text-white">{q.count}</p>
            <p className="text-xs text-gray-400">{q.label}</p>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Summary label="Year" value={summary.year} />
        <Summary label="Total Contributions" value={summary.total} />
        <Summary label="Most Active Month" value={summary.mostActiveMonth} />
      </div>

      {/* REPO HIGHLIGHTS */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">
          Repository Highlights
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {topRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-400/40 transition"
            >
              <p className="text-white font-medium">{repo.name}</p>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {repo.description || "No description"}
              </p>

              <div className="flex gap-4 mt-4 text-xs text-gray-400">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>{repo.language || "—"}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Summary = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
    <p className="text-2xl font-bold text-white">{value || "—"}</p>
    <p className="text-sm text-gray-400 mt-1">{label}</p>
  </div>
);

export default GithubStats;
