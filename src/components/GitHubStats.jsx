import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Line,
  PieChart,
  Pie,
} from "recharts";
import { format } from "date-fns";

const USERNAME = "jasleenkaur0609";

/* ---------- REPO HELPERS ---------- */
const CATEGORIES = {
  Frontend: ["react", "frontend", "ui", "website", "portfolio"],
  Backend: ["backend", "api", "node", "express", "server"],
  Automation: ["rpa", "automation", "power", "bot", "flow"],
};

const getCategory = (repo) => {
  const text = `${repo.name} ${repo.description || ""}`.toLowerCase();
  if (CATEGORIES.Automation.some(k => text.includes(k))) return "Automation";
  if (CATEGORIES.Backend.some(k => text.includes(k))) return "Backend";
  return "Frontend";
};

const isWIP = (repo) => {
  const text = `${repo.name} ${repo.description || ""}`.toLowerCase();
  return ["wip", "work in progress", "ongoing", "draft"].some(k =>
    text.includes(k)
  );
};

const GithubStats = () => {
  const [yearOffset, setYearOffset] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topRepos, setTopRepos] = useState([]);
  const [repoFilter, setRepoFilter] = useState("All");
  const [summary, setSummary] = useState({
    year: "",
    total: 0,
    currentStreak: 0,
    longestStreak: 0,
  });
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

      /* ---------- DAYS ---------- */
      const days =
        graphJson.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
          (w) => w.contributionDays
        );

      /* ---------- STREAKS ---------- */
      let currentStreak = 0;
      let longestStreak = 0;
      let temp = 0;

      for (let i = days.length - 1; i >= 0; i--) {
        if (days[i].contributionCount > 0) {
          temp++;
          currentStreak = temp;
          longestStreak = Math.max(longestStreak, temp);
        } else if (temp > 0) break;
      }

      /* ---------- MONTHLY ---------- */
      const months = Array.from({ length: 12 }, (_, i) => ({
        month: format(new Date(year, i, 1), "MMM"),
        count: 0,
      }));

      days.forEach((d) => {
        months[new Date(d.date).getMonth()].count += d.contributionCount;
      });

      const trendData = months.map((m, i) => ({
        ...m,
        trend:
          i === 0
            ? m.count
            : Math.round((months[i - 1].count + m.count) / 2),
      }));

      /* ---------- LANGUAGES ---------- */
      const langMap = {};
      repoJson.forEach((r) => {
        if (r.language) {
          langMap[r.language] = (langMap[r.language] || 0) + 1;
        }
      });

      const langData = Object.entries(langMap)
        .map(([name, value]) => ({ name, value }))
        .slice(0, 5);

      /* ---------- ENHANCED REPOS ---------- */
      const enhancedRepos = repoJson
        .filter((r) => !r.fork && r.description && r.size > 50)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6)
        .map((repo, index) => ({
          ...repo,
          featured: index === 0,
          wip: isWIP(repo),
          category: getCategory(repo),
          techStack:
            repo.topics && repo.topics.length > 0
              ? repo.topics
              : repo.language
              ? [repo.language]
              : [],
        }));

      setMonthlyData(trendData);
      setLanguages(langData);
      setTopRepos(enhancedRepos);
      setSummary({
        year,
        total:
          graphJson.data.user.contributionsCollection.contributionCalendar
            .totalContributions,
        currentStreak,
        longestStreak,
      });

      setLoading(false);
    } catch (err) {
      console.error("GitHubStats error:", err);
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-white">GitHub Activity</h2>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full bg-cyan-500 text-black text-sm font-medium"
        >
          View GitHub →
        </a>
      </div>

      {/* SUMMARY */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <Stat label="Year" value={summary.year} />
        <Stat label="Total Contributions" value={summary.total} />
        <Stat label="Current Streak 🔥" value={`${summary.currentStreak} days`} />
        <Stat label="Longest Streak 🏆" value={`${summary.longestStreak} days`} />
      </div>

      {/* MONTHLY CHART */}
      <div className="bg-white/5 rounded-2xl p-6 mb-12">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {monthlyData.map((_, i) => (
                <Cell key={i} fill="#22d3ee" />
              ))}
            </Bar>
            <Line dataKey="trend" stroke="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-6">
        {["All", "Frontend", "Backend", "Automation"].map((type) => (
          <button
            key={type}
            onClick={() => setRepoFilter(type)}
            className={`px-3 py-1 rounded-full text-xs ${
              repoFilter === type
                ? "bg-cyan-500 text-black"
                : "bg-white/5 text-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* REPOS */}
      <div className="grid md:grid-cols-3 gap-6">
        {(repoFilter === "All"
          ? topRepos
          : topRepos.filter((r) => r.category === repoFilter)
        ).map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="bg-white/5 rounded-xl p-5 border border-white/10"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-white font-medium">{repo.name}</p>
              {repo.featured && (
                <span className="text-xs bg-cyan-500 text-black px-2 py-0.5 rounded">
                  Featured
                </span>
              )}
            </div>

            {repo.wip && (
              <span className="text-xs text-yellow-400">Work in Progress</span>
            )}

            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
              {repo.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {repo.techStack.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 bg-white/10 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </motion.section>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-white/5 rounded-xl p-6 text-center">
    <p className="text-2xl font-bold text-white">{value || "—"}</p>
    <p className="text-sm text-gray-400 mt-1">{label}</p>
  </div>
);

export default GithubStats;
