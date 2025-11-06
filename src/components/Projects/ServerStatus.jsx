import { useQuery } from "@tanstack/react-query";
import { useServers } from "@/api/bot";

function ServerStatus() {
  const { data, isLoading, error } = useQuery(useServers());

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-base-content/20";
      default:
        return "bg-yellow-500";
    }
  };

  // skeleton
  if (isLoading) {
    return (
      <div className="space-y-2 ">
        <p className="text-xs font-light  text-base-content/50 ">
          Game Servers
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[26px] skeleton  bg-base-content/5 w-20 border border-base-content/20 "
            />
          ))}
        </div>
      </div>
    );
  }

  // silently fail
  if (error || !data) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-light text-base-content/50">Game Servers</p>
      <div className="flex flex-wrap gap-2">
        {data.servers.map((server) => (
          <div
            key={server.container}
            className="flex items-center gap-1.5 px-2 py-1 border border-base-content/20 text-xs font-light text-base-content"
          >
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(
                server.status
              )} ${server.status === "online" ? "animate-pulse" : ""}`}
            />
            <span className="capitalize">{server.game}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServerStatus;
