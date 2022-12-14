import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  return (
    <Card
      className="video__card"
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link
        to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}
        sx={{ flex: { xs: "1" } }}
      >
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{
            width: { xs: "100%", sm: "358px" },
            height: { xs: 250, sm: 180 },
          }}
        />
      </Link>
      <CardContent
        sx={{ backgroundColor: "#1E1E1E", height: "106px" }}
        className="card__content"
      >
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon
              sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
            />
          </Typography>
          <Typography
            variant="subtitle2"
            color="gray"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon
              sx={{ fontSize: "12px", color: "gray", mr: "5px" }}
            />
            {snippet?.publishedAt.split("T")[0]}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
