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
                // Mobile styles
                return {
                  container: {
                      height: '96vh',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center', // Center content vertically
                      alignItems: 'center', // Center align items horizontally
                      width: '100%', // Ensure full width
                    
                      marginRight:'15px'
                  },
                  videoCard: {
                      width: '90%', // Set width for mobile
                      maxWidth: '400px', // Optional max width
                      margin: '1rem auto', // Center the card
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional styling
                  },
              
            };
        } else {
            // Desktop styles
            return {
                container: {
                    height: 'auto', // Allow height to adjust based on content
                    overflowY: 'hidden', // Hide overflow on larger screens
                    display: 'flex',
                    flexDirection: 'column', // Stack cards vertically
                    alignItems: 'center', // Center align cards
                    padding: '1rem',
                },
                videoCard: {
                    width: '100%', // Full width for desktop, one video per row
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
