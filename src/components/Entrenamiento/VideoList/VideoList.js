import React, { useEffect, useState } from 'react';
import { getLocalUserdata } from "../../../services/auth/localStorageData";
import userServices from 'services/httpService/userAuth/userServices';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import VideoCard from './VideoCard/VideoCard';

const VideoList = (props) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateLoading = () => {
        setLoading(false);
    };

    useEffect(() => {
        const data = getLocalUserdata();
        userServices.commonPostService('/fetch-videos', { "type": data.type })
            .then(response => {
                if (response.status === 200) {
                    console.log("Fetched Videos:", response.data); // Log fetched videos
                    props.updateTotal(response.data.length);
                    setVideos(response.data);
                } else {
                    toast.error("Error fetching videos.");
                }
            })
            .catch((error) => {
                toast.error("Error fetching videos.");
            });
    }, []);

    // Function to determine styles based on screen size
    const getResponsiveStyles = () => {
        const width = window.innerWidth;

        if (width < 768) {
            // Mobile styles
            return {
                container: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // Align to the top left on mobile
                    justifyContent: 'flex-start', // Align items to the top
                    width: '100%',
                    marginRight: '15px'
                },
                videoCard: {
                    width: '90%',
                    margin: '1rem auto',
                },
            };
        } else {
            // Desktop styles
            return {
                container: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center align cards on desktop
                    padding: '1rem',
                },
                videoCard: {
                    width: '100%',
                    marginBottom: '1rem',
                },
            };
        }
    };

    const styles = getResponsiveStyles();

    return (
        videos.length > 0 ? (
            <div style={styles.container}>
                {
                    videos.map((item, index) => (
                        <div key={index} style={styles.videoCard}>
                            <VideoCard 
                                loading={loading} 
                                updateLoading={updateLoading} 
                                index={index} 
                                item={item} 
                                updateID={props.updateID} 
                            />
                        </div>
                    ))
                }
            </div>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2%' }}>
                <CircularProgress disableShrink />
            </div>
        )
    );
};

export default VideoList;
