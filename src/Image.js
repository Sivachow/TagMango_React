import React, { useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

const Video = () => {
 const [videoSrcs, setVideoSrcs] = useState([]);

 const getVideos = async () => {
 try {
 const { data } = await axios.get('http://localhost:4000/api/persons');
 const videoSrcs = data[0].portfolio.videos.map((video) => {
 const buffer_data = video.data.data;
 const buffer = Buffer.from(buffer_data);
 return `data:${video.contentType};base64,${buffer.toString('base64')}`;
 });
 setVideoSrcs(videoSrcs);
 } catch (error) {
 console.error(error);
 }
 };

 return (
 <div>
 <button onClick={getVideos}>Get Videos</button>
 {videoSrcs.map((videoSrc) => (
 <video controls>
 <source src={videoSrc} type="video/mp4" />
 </video>
 ))}
 </div>
 );
};

export default Video;
