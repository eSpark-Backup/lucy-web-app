import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/profile";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/slices/authSlice";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      dispatch(setProfile(data));
      queryClient.invalidateQueries(["profile"]);
    },
  });
};
