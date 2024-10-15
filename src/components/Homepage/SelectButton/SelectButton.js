import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import AvatarCard from './AvatarCard/AvatarCard';
import userServices from 'services/httpService/userAuth/userServices';
import { getLocalUserdata, updateLocalstoragepic } from "../../../services/auth/localStorageData";
import { toast } from 'react-toastify';
import '../styles.css';

const SelectButton = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [openModal, setOpenModal] = useState(false);
    const inputPhoto = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const selectedImage = (e) => {
        let data = getLocalUserdata();
        let formData = new FormData();
        formData.append('user_id', data.id);
        formData.append('type', 'avatar');
        formData.append('image', e.target.files[0]);
        userServices.commonPostService('/avatar/store', formData)
            .then((response) => {
                if (response.status === 200) {
                    userServices.commonPostService('/user', { "id": data.id })
                        .then((response) => {
                            if (response.status === 200) {
                                updateLocalstoragepic(response.data.data.photo);
                                document.getElementById('profile_pic').src = `https://neoestudio.net/userImage/${response.data.data.photo}`;
                            } else {
                                toast.error('Please try again!');
                            }
                        })
                        .catch((error) => {
                            toast.error("Please try again.")
                        })
                } else {
                    console.log('Cannot set avatar!');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const selectPhoto = () => {
        inputPhoto.current.click();
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const openCard = () => {
        setOpenModal(true);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                sx={{
                    marginLeft: { xs: 0 },
                    width: { xs: '90%', sm: 'auto' },
                    fontSize: { xs: '0.2rem', sm: '1rem' },
                    padding: { sm: '8px' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                variant="contained"
                startIcon={
                    <PhotoCamera sx={{ fontSize: { xs: '1rem', sm: '2rem' } }} />
                }
            >
                Cambiar Imagen
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={(event) => { handleClose(event); openCard(); }}>
                                        Avatar
                                    </MenuItem>
                                    <MenuItem onClick={(event) => { handleClose(event); selectPhoto(); }}>
                                        Galería
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <AvatarCard closeModal={closeModal} openModal={openModal} />
            <input onChange={(e) => selectedImage(e)} ref={inputPhoto} style={{ display: 'none' }} type="file" id="profilephoto" name="profilePhoto" accept="image/*" />
        </>
    );
};

export default SelectButton;
