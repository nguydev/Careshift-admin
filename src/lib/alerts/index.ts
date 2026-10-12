import Swal from "sweetalert2";

export type TResError = {
  data?: {
    message?: string;
  };
  message?: string;
  error?: string;
  status?: number;
  statusCode?: number;
};

export type TRejectResObj = {
  title: string;
  description: string;
};

export const successAlert = ({
  message,
  timer,
  title = true,
  confirmButton = false,
  icon = false,
}: {
  message: string;
  timer?: number;
  title?: boolean;
  confirmButton?: boolean;
  icon?: boolean;
}) => {
  Swal.fire({
    icon: icon ? "success" : undefined,
    title: title ? "Success" : undefined,
    text: message,
    showConfirmButton: confirmButton,
    confirmButtonText: "Ok",
    timer: timer,
  });
};

export const errorAlert = ({
  icon = undefined,
  error,
  title,
}: {
  icon?: "error" | "warning" | "info" | undefined;
  error: TResError;
  title?: string;
}) => {
  // console.log(error?.data?.message)
  Swal.fire({
    icon: icon,
    title: title || "Failed!",
    confirmButtonText: "Ok",
    text:
      error?.data?.message ||
      error?.message ||
      //  error?.error?.slice(10) ||
      "Something went wrong. Please try again later.",
  });
  // console.log(error)
};
