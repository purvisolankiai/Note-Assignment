import React, { useEffect, useState } from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Avatar, Container, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { handleUpdateUser, handleUpdateUserDialog, login } from "../redux/userSlice";
import EditIcon from '@mui/icons-material/Edit';
import PrimarySearchAppBar from '../components/Navbar';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';

const CustomCard = styled(Card)(({ theme }) => ({
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    borderRadius: 2,
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const ProfilePage = () => {
    const { UpdateUserDialog } = useSelector((state) => state.user.dialogState);
    const { currentUser } = useSelector(state => state.user);
    const [editData, setEditData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        dispatch(login(user));
    }, [dispatch]);

    const handleDialogOpen = (data = null) => {
        setEditData(data);
        dispatch(handleUpdateUserDialog(true));
    };

    const handleDialogClose = () => {
        dispatch(handleUpdateUserDialog(false));
        setEditData(null);
    };

    const handleUpdate = (user) => {
        handleDialogOpen(user);
    };

    const handleSubmit = (values, { resetForm }) => {
        dispatch(handleUpdateUser({ ...editData, ...values }));
        handleDialogClose();
        resetForm();
    };

    const profileValidationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required('First name is required'),
        lastname: Yup.string()
            .required('Last name is required'),
    });

    return (
        <>
            <PrimarySearchAppBar />
            <Grid container justifyContent='flex-end' paddingRight={4} paddingTop={4}>
                <Button
                    sx={{
                        border: '1px solid #818CF8',
                        borderRadius: 1,
                        color: '#fff',
                        textTransform: 'capitalize',
                        backgroundColor: '#818CF8',
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: '#818CF8',
                        },
                    }}
                >
                    <Link to='/dashboard' style={{ color: 'inherit', textDecoration: 'none' }}>Return To Dashboard</Link>
                </Button>
            </Grid>
            <Container maxWidth="xs" sx={{ paddingTop: "6%" }}>
                <CustomCard>
                    <CardContent sx={{ paddingBlock: 5 }}>
                        <Grid container spacing={2} direction='column'>
                            <Grid item container justifyContent='center' alignItems='center' direction='column'>
                                <Grid item>
                                    <Avatar sx={{ bgcolor: '#818CF8', height: '60px', width: '60px' }}>
                                        <Avatar sx={{ bgcolor: '#F2F7FB', height: '52px', width: '52px' }}>
                                            <PersonIcon fontSize='large' className='text-[#818CF8]' />
                                        </Avatar>
                                    </Avatar>
                                </Grid>
                                <Grid item container justifyContent='center' gap={2} marginTop={2} sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' } }}>
                                    <Grid item container gap={1} paddingInline={2}>
                                        <Typography variant="h8" sx={{ fontWeight: 'bold' }}>First Name :</Typography>
                                        <Typography variant="h8">{currentUser?.firstname}</Typography>
                                    </Grid>
                                    <Grid item container gap={1} paddingInline={2}>
                                        <Typography variant="h8" sx={{ fontWeight: 'bold' }}>Last Name :</Typography>
                                        <Typography variant="h8">{currentUser?.lastname}</Typography>
                                    </Grid>
                                    <Grid item container gap={1} sx={{ paddingLeft: "14px" }}>
                                        <Typography variant="h8" sx={{ fontWeight: 'bold' }}>Email :</Typography>
                                        <Typography variant="h8">{currentUser?.email}</Typography>
                                    </Grid>
                                    <Grid item container gap={1} paddingInline={2}>
                                        <Typography variant='h8' sx={{ fontWeight: 'bold' }}>Phone Number :</Typography>
                                        <Typography variant="h8">{currentUser?.number}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center" direction='column'>
                            <Button
                                sx={{
                                    border: '1px solid #818CF8',
                                    borderRadius: 1,
                                    color: '#fff',
                                    textTransform: 'capitalize',
                                    backgroundColor: '#818CF8',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                        color: '#818CF8',
                                    },
                                }}
                                onClick={() => handleUpdate(currentUser)}
                            >
                                Update Profile
                            </Button>
                        </Grid>
                    </CardContent>
                </CustomCard>
            </Container>
            <Dialog open={UpdateUserDialog} onClose={handleDialogClose}>
                <Formik
                    initialValues={{
                        firstname: editData ? editData.firstname : '',
                        lastname: editData ? editData.lastname : '',
                    }}
                    validationSchema={profileValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <Form className='py-2'>
                            <DialogTitle className='flex justify-center items-center'>
                                <Grid item container justifyContent="center" alignItems="center" direction='column'>
                                    <Avatar sx={{ bgcolor: '#818CF8', height: '60px', width: '60px' }}>
                                        <Avatar sx={{ bgcolor: '#F2F7FB', height: '52px', width: '52px' }}>
                                            <PersonIcon fontSize='large' className='text-[#818CF8]' />
                                        </Avatar>
                                    </Avatar>
                                    Update Profile
                                </Grid>
                            </DialogTitle>
                            <DialogContent className='mx-4'>
                                <TextField
                                    required
                                    type='text'
                                    name='firstname'
                                    placeholder='Firstname'
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="outlined-required"
                                    label="Firstname"
                                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                    helperText={formik.touched.firstname && formik.errors.firstname}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    type='text'
                                    name='lastname'
                                    placeholder='Lastname'
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="outlined-required"
                                    label="Lastname"
                                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                    helperText={formik.touched.lastname && formik.errors.lastname}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    disabled
                                    id="email"
                                    label="Email"
                                    defaultValue={currentUser?.email}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    disabled
                                    id="phoneNumber"
                                    label="Phone Number"
                                    defaultValue={currentUser?.number}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </DialogContent>
                            <DialogActions className='mx-8'>
                                <Button sx={{
                                    backgroundColor: "lightgrey",
                                    borderRadius: 1,
                                    color: "black",
                                    textTransform: 'capitalize',
                                    "&:hover": {
                                        backgroundColor: "gray",
                                        color: '#fff'
                                    }
                                }} onClick={handleDialogClose} >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={formik.isSubmitting} sx={{
                                    border: '1px solid #818CF8',
                                    borderRadius: 1,
                                    color: '#fff',
                                    textTransform: 'capitalize',
                                    backgroundColor: '#818CF8',
                                    '&:hover': {
                                        backgroundColor: '#fff',
                                        color: '#818CF8',
                                    },
                                }} ><EditIcon sx={{ width: '0.6em' }} /> &nbsp;
                                    Update
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
};

export default ProfilePage;
