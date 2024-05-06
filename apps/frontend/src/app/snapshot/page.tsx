"use client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import Link from "next/link";
import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

if (process.env.NODE_ENV != "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

interface WalletProps {
  date: string;
  walletHash: string;
  renzoPoints: number;
  eigenLayerPoints: number;
  zircuitPoints: number;
  swellPoints: number;
  swellEygenData: number;
  karakPoints: number;
  loyaltyPointsEtherFi: number;
  eigenlayerPointsEtherFi: number;
  liquidLoyaltyPointsEtherFi: number;
  liquidEigenlayerPointsEtherFi: number;
}

export default function Home() {
  const [history, setHistory] = useState<[WalletProps[]] | []>([]);

  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const history = JSON.parse(reactLocalStorage.get("history"));
    setHistory(history);
    setIndex(history.length - 1);
    setLoading(false);
  }, []);

  if (loading) return "loading...";

  if (history.length === 0) return "No history";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Snapshot:{" "}
      {history.map((item, index) => {
        return (
          <a key={`snapshot${index}`} onClick={() => setIndex(index)} href="#">
            {new Date(item[0].date).toLocaleString()}
          </a>
        );
      })}{" "}
      <div className="flex flex-col w-full">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      walletHash
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      renzo / EL
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      zircuit
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Swell/EL
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      EtherFI/EL
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Karak
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr className="odd:bg-white even:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        Loading...
                      </td>
                    </tr>
                  )}
                  {history[index].map((item: WalletProps, index: number) => {
                    return (
                      <tr
                        key={item?.walletHash}
                        className="odd:bg-white even:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {new Date(item.date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.walletHash}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item?.renzoPoints == -1
                            ? "Loading..."
                            : item.renzoPoints}{" "}
                          /{" "}
                          {item?.eigenLayerPoints == -1
                            ? "Loading..."
                            : item?.eigenLayerPoints}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item?.zircuitPoints == -1
                            ? "Loading..."
                            : item.zircuitPoints}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item?.swellPoints == -1
                            ? "Loading..."
                            : item?.swellPoints}{" "}
                          /{" "}
                          {item?.swellEygenData == -1
                            ? "Loading..."
                            : item?.swellEygenData}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item?.loyaltyPointsEtherFi == -1
                            ? "Loading..."
                            : item?.loyaltyPointsEtherFi
                              ? item?.loyaltyPointsEtherFi
                              : 0}
                          /
                          {item?.eigenlayerPointsEtherFi == -1
                            ? "Loading..."
                            : item?.eigenlayerPointsEtherFi
                              ? item?.eigenlayerPointsEtherFi
                              : 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item?.karakPoints == -1
                            ? "Loading..."
                            : item?.karakPoints
                              ? item?.karakPoints
                              : 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return "history";
}
