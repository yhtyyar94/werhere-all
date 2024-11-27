import ListAllRecords from "@/components/ListAllRecords";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Admin() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user.isLoggedIn || !user.username) {
      router.push("/login");
    }
  }, [user, router]);
  return <>{user.username && <ListAllRecords />}</>;
}
