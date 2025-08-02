import Spinner from "@/components/ui/Spinner";
import {
  useDeleteAllNotificationsMutation,
  useDeleteSingleNotificationMutation,
  useFetchAllNotificationsQuery,
} from "@/features/notifications/notificationApi";
import type { Notification, NotificationsDetails } from "@/types/notification";
import getRelativeTime from "@/utils/convertTime";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import nonotification from "@/assets/no_notification.png";
import type { ApiError } from "@/types/error";
import toast from "react-hot-toast";
import { TailChase } from "ldrs/react";

const NotificationPage = () => {
  const { isLoading, data, error } = useFetchAllNotificationsQuery();
  const [deletingNotificationId, setDeletingNotificationId] = useState<
    string | null
  >(null);
  const [deleteAll, { isLoading: isLoading3 }] =
    useDeleteAllNotificationsMutation();

  const [notification, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data]);

  const [deleteSingle, { isLoading: isLoading2 }] =
    useDeleteSingleNotificationMutation();

  const getNotificationDetails = (type: string): NotificationsDetails => {
    switch (type) {
      case "follow":
        return {
          typeName: "New Follower",
          imgSrc:
            "https://imgs.search.brave.com/E6ul_sxQrQrHDcGZZ1O-J01vCZ-AIZEOe95y2lD7rBM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9mb2xsb3ct/dXAtaWNvbi1kb3du/bG9hZC1pbi1zdmct/cG5nLWdpZi1maWxl/LWZvcm1hdHMtLWNh/bGVuZGFyLXNjaGVk/dWxlLWFwcG9pbnRt/ZW50LWFnZW5kYS1j/dXN0b21lci1zdXBw/b3J0LXBhY2stbWlz/Y2VsbGFuZW91cy1p/Y29ucy0xMTkxNzY3/NC5wbmc_Zj13ZWJw/Jnc9MTI4",
        };
      case "newNovel":
        return {
          typeName: "New Novel",
          imgSrc:
            "https://imgs.search.brave.com/TcMJTJE6jtq31RnDqVLP0M4PxkuyYaoYKjsUwTL5L6A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWJvb2staWNvbi1k/b3dubG9hZC1pbi1z/dmctcG5nLWdpZi1m/aWxlLWZvcm1hdHMt/LWd1aWRlLWRhdGEt/aW5mb3JtYXRpb24t/bm92ZWxzLXN0dWR5/LXVzZXItaW50ZXJm/YWNlLXZvbC0xLXBh/Y2staWNvbnMtMTQx/MjQucG5nP2Y9d2Vi/cCZ3PTEyOA",
        };
      case "newChapter":
        return {
          typeName: "New Chapter",
          imgSrc:
            "https://imgs.search.brave.com/np16VxOb3Q2LqEzZajqyR3gWS-Du_I2RSl8ACsd1Cxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9jaGFwdGVy/LXNlY3Rpb24taWNv/bi1kb3dubG9hZC1p/bi1zdmctcG5nLWdp/Zi1maWxlLWZvcm1h/dHMtLWRpdmlzaW9u/LXBhcnQtcG9ydGlv/bi1taXNjZWxsYW5l/b3VzLTE0NS1wYWNr/LWljb25zLTEyMDIw/NTM1LnBuZz9mPXdl/YnAmdz0xMjg",
        };
      case "comment":
        return {
          typeName: "New Comment",
          imgSrc:
            "https://imgs.search.brave.com/M28EVm7VSpTNjx0fbrxdZidxmhaa5TwaGYbkagZw8MA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2l0eXBuZy5jb20v/cHVibGljL3VwbG9h/ZHMvcHJldmlldy9m/cmVlLXNwZWVjaC1j/b21tZW50LWNoYXQt/YmxhY2staWNvbi1w/bmctNzAxNzUxNjk0/OTcyNzkwNjluOTFl/ZnBsay5wbmc_dj0y/MDI1MDQyMzE1",
        };
      case "review":
        return {
          typeName: "New Review",
          imgSrc:
            "https://imgs.search.brave.com/BLhoGiXnAhSVGSyhVV5fFBufYICjXZ4NLKUhpZR0LXk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjUv/MDE4LzYxNC9zbWFs/bC8zZC1pbGx1c3Ry/YXRpb24taWNvbi1v/Zi1wdXJwbGUtcmV2/aWV3LWFuZC1mZWVk/YmFjay1mb3ItdWkt/dXgtd2ViLW1vYmls/ZS1hcHBzLXNvY2lh/bC1tZWRpYS1hZHMt/ZGVzaWduLXBuZy5w/bmc",
        };
      case "newUserSignUp":
        return {
          typeName: "New User Signup",
          imgSrc:
            "https://plus.unsplash.com/premium_photo-1732757787074-0f95bf19cf73?q=80&w=1954&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        };
      default:
        return {
          typeName: "Notification",
          imgSrc: "https://via.placeholder.com/40x40.png?text=N", // default fallback
        };
    }
  };

  if (isLoading)
    return (
      <>
        <div className="bg-background w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );

  if (error) {
    console.log(error);
  }

  const handleDeleteSingleNotification = async (notificationId: string) => {
    setDeletingNotificationId(notificationId);
    try {
      const response = await deleteSingle(notificationId).unwrap();
      if (response) {
        setNotifications((prev) =>
          prev.filter((notification) => notification._id !== notificationId)
        );
        toast.success("Notification Deleted Successfully");
        setDeletingNotificationId(null);
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError);
      toast.error(apiError?.data?.message || "An error occurred");
      setDeletingNotificationId(null);
    }
  };

  const handleDeleteAllNotification = async () => {
    try {
      const response = await deleteAll().unwrap();
      if (response) {
        setNotifications([]);
        toast.success("Notifications deleted successfully!");
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError);
      toast.error(apiError?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className=" min-h-screen">
        <div className="containerBox px-3 md:p-0">
          <div className="pt-5 flex items-center justify-between">
            <div className="flex">
              <IoIosNotificationsOutline className="size-9 mr-1" />
              <h1 className="text-2xl font-semibold">Notifications</h1>
            </div>
            {notification?.length !== 0 ? (
              <div>
                {!isLoading3 ? (
                  <h1
                    onClick={handleDeleteAllNotification}
                    className="cursor-pointer text-destructive font-semibold hover:border-b-2 border-destructive"
                  >
                    Delete All
                  </h1>
                ) : (
                  <TailChase size="20" speed="1.75" color="#1e9df1" />
                )}
              </div>
            ) : null}
          </div>
          {notification?.map((notification) => {
            const { imgSrc, typeName } = getNotificationDetails(
              notification.type
            );
            return (
              <div
                key={notification._id}
                className="bg-secondary-foreground mt-3 rounded-lg p-4 shadow-sm border-l-4 border-l-primary hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      src={`${imgSrc}`}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex justify-between min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">{typeName}</h3>
                        <p className="text-sm mt-1 italic">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {getRelativeTime(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div>
                      {isLoading2 &&
                      deletingNotificationId === notification._id ? (
                        <TailChase size="20" speed="1.75" color="#1e9df1" />
                      ) : (
                        <MdDeleteOutline
                          onClick={() =>
                            handleDeleteSingleNotification(notification._id)
                          }
                          className="size-5 cursor-pointer hover:text-destructive transition-all duration-200"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {notification?.length === 0 && (
            <div className="flex flex-col items-center mt-10">
              <div>
                <img
                  className="size-60 sm:size-96"
                  src={nonotification}
                  alt=""
                />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-destructive">
                Notifications Not Found!
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
