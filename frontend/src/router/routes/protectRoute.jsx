import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
  const { role, userInformaion } = useSelector((state) => state.auth);
  if (role) {
    if (userInformaion) {
      if (route.role) {
        if (userInformaion.role === route.role) {
          if (route.status) {
            if (route.status === userInformaion.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              if (userInformaion.status === "pending") {
                return <Navigate to="/seller/account-pending" replace />;
              } else {
                return <Navigate to="/seller/account-deactive" replace />;
              }
            }
          } else {
            if (route.visibility) {
              if (route.visibility.some((r) => r === userInformaion.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate to="/seller/account-pending" replace />;
              }
            } else {
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
        } else {
          return <Navigate to="/unauthorized" replace />;
        }
      } else {
        if (route.ability === "seller") {
          return <Suspense fallback={null}>{children}</Suspense>;
        }
      }
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;
