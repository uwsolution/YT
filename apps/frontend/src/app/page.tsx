"use client";

import {
  walletEtherFiPointsQuery,
  walletKarakPointsQuery,
  walletRenzoQuery,
  walletSwellPointsQuery,
  walletZircuitQuery,
} from "@/graphql";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import client from "@/graphql/client";
import { reactLocalStorage } from "reactjs-localstorage";
import Link from "next/link";

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

if (process.env.NODE_ENV != "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export default function Home() {
  const [text, setText] = useState<string>();
  const [wallet, setWallet] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const wallets = reactLocalStorage.get("wallets");
    if (wallets) {
      setText(JSON.parse(wallets));
    }
  }, []);

  const handleSearch = async (e: { preventDefault: () => void }) => {
    if (loading) return;
    setLoading(true);

    setWallet([]);
    e.preventDefault();
    const wallets = text?.split("\n");
    reactLocalStorage.set("wallets", JSON.stringify(text));

    if (!wallets) {
      setLoading(false);
      return;
    }

    wallets.forEach(async (item) => {
      setWallet((prev: WalletProps[]) => [
        ...prev,
        {
          date: Date.now(),
          walletHash: item,
          renzoPoints: -1,
          eigenLayerPoints: -1,
          zircuitPoints: -1,
          swellPoints: -1,
          swellEygenData: -1,
          karakPoints: -1,
          loyaltyPointsEtherFi: -1,
          eigenlayerPointsEtherFi: -1,
          liquidLoyaltyPointsEtherFi: -1,
          liquidEigenlayerPointsEtherFi: -1,
        },
      ]);
    });

    await Promise.all(
      wallets.map(async (item): Promise<void> => {
        const { data } = await client.query({
          query: gql(walletRenzoQuery),
          variables: { wallet: item },
        });

        setWallet((prev: WalletProps[]) => [
          ...prev.map((prevItem) => {
            prevItem?.walletHash === item
              ? (prevItem.renzoPoints = data.walletRenzo.renzoPoints)
              : prevItem;
            prevItem?.walletHash === item
              ? (prevItem.eigenLayerPoints = data.walletRenzo.eigenLayerPoints)
              : prevItem;
            return prevItem;
          }),
        ]);

        const zircuitData = await client.query({
          query: gql(walletZircuitQuery),
          variables: { wallet: item },
        });

        setWallet((prev: WalletProps[]) => [
          ...prev.map((prevItem) => {
            prevItem?.walletHash === item
              ? (prevItem.zircuitPoints =
                  zircuitData.data.walletZircuit.zircuitPoints)
              : prevItem;
            return prevItem;
          }),
        ]);

        const etherFiData = await client.query({
          query: gql(walletEtherFiPointsQuery),
          variables: { wallet: item },
        });

        setWallet((prev: WalletProps[]) => [
          ...prev.map((prevItem) => {
            prevItem?.walletHash === item
              ? (prevItem.loyaltyPointsEtherFi =
                  etherFiData.data?.walletEtherFi?.loyaltyPoints)
              : prevItem;

            prevItem?.walletHash === item
              ? (prevItem.eigenlayerPointsEtherFi =
                  etherFiData.data?.walletEtherFi?.eigenlayerPoints)
              : prevItem;

            return prevItem;
          }),
        ]);

        const KarakData = await client.query({
          query: gql(walletKarakPointsQuery),
          variables: { wallet: item },
        });

        setWallet((prev: WalletProps[]) => [
          ...prev.map((prevItem) => {
            prevItem?.walletHash === item
              ? (prevItem.karakPoints = KarakData.data?.walletKarak?.points)
              : prevItem;
            return prevItem;
          }),
        ]);

        const swellData = await client.query({
          query: gql(walletSwellPointsQuery),
          variables: { wallet: item },
        });

        setWallet((prev: WalletProps[]) => [
          ...prev.map((prevItem) => {
            prevItem?.walletHash === item
              ? (prevItem.swellPoints = swellData.data?.walletSwellPoints
                  ?.Points
                  ? swellData.data?.walletSwellPoints?.Points
                  : 0)
              : prevItem;

            prevItem?.walletHash === item
              ? (prevItem.swellEygenData = swellData.data?.walletSwellPoints
                  ?.EigenPoints
                  ? swellData.data?.walletSwellPoints?.EigenPoints
                  : 0)
              : prevItem;

            return prevItem;
          }),
        ]);
      })
    );

    setLoading(false);
  };

  useEffect(() => {
    if (reactLocalStorage.get("history") == undefined)
      reactLocalStorage.set("history", JSON.stringify([]));
    if (loading || wallet.length == 0) return;
    reactLocalStorage.set(
      "history",
      JSON.stringify([...JSON.parse(reactLocalStorage.get("history")), wallet])
    );
  }, [loading]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
                  {wallet?.map((item: WalletProps, index: number) => {
                    return (
                      <tr
                        key={item?.walletHash}
                        className="odd:bg-white even:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {index + 1}
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

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Put your wallets here
      </label>
      <textarea
        onChange={(e) => setText(e.target.value)}
        id="message"
        rows="4"
        value={text}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={handleSearch}
      >
        Submit
      </button>
    </main>
  );
}
