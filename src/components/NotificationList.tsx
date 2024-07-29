import React from "react";
import { List } from "@material-ui/core";

import NotificationListItem from "./NotificationListItem";
import { NotificationResponseItem } from "../models";
import EmptyList from "./EmptyList";

export interface NotificationsListProps {
  notifications: NotificationResponseItem[];
  updateNotification: Function;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  updateNotification,
}) => {
  return (
    <>
      {notifications?.length > 0 ? (
        <List data-test="notifications-list">
          {notifications.map((notification: NotificationResponseItem) => (
            <NotificationListItem
              key={notification.id}
              notification={notification}
              updateNotification={updateNotification}
            />
          ))}
        </List>
      ) : (
        <EmptyList entity="Notifications">
          <img style={{ width: 100, height: 100 }} src="/img/EmptyNotifications.png" alt="" />
        </EmptyList>
      )}
    </>
  );
};

export default NotificationsList;
