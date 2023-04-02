import { useAppContext } from "../../context/AppContext";
import Stat from "../../components/Stat";
import Loading from "../../components/Loading";
import { useEffect } from "react";

const Stats = () => {
  const { isLoading, getStats, stats, user } = useAppContext();
  useEffect(() => {
    if (user) {
      getStats();
    }
  }, []);
  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-[50vh] lg:w-[100vh]">
          <Loading />
        </div>
      </>
    );
  }
  return stats ? (
    <>
      <div className="flex pt-6">
        <h1 className="font-base text-3xl text-slate-700">Stats</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-start">
        <Stat stats={stats} />
      </div>
    </>
  ) : (
    <>
      <div className="flex pt-6">
        <h1 className="font-base text-3xl text-slate-700">Stats</h1>
      </div>
    </>
  );
};

export default Stats;
