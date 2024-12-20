import ListAllRecords from "@/components/ListAllRecords";
import { RootState } from "@/store/store";
import { logout } from "@/store/userSlice";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Admin() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.isLoggedIn || !user.username) {
      router.push("/login");
    }
  }, [user, router]);
  return (
    <VStack>
      <Button
        colorPalette={"red"}
        onClick={() => {
          dispatch(logout());
          router.push("/login");
        }}
      >
        Log out
      </Button>
      {user.username && <ListAllRecords />}
    </VStack>
  );
}
