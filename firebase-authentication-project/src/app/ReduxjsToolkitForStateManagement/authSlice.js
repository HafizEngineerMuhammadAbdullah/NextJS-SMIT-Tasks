import { auth } from "@/utils/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
    user: null,
    loading: false,
    error: null,
};


// Signup
// The thunk can receive the whole form object
export const signup = createAsyncThunk(
    "auth/signup",
    async (formData) => {
        //  accept the object in the thunk and extract the credentials Firebase needs:
        const { email, password, firstName, lastName } = formData;
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return {
            uid: result.user.uid,
            email: result.user.email,
            firstName,
            lastName,
        };
    }
);


// Login/Signin
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }) => {
        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return {
            uid: result.user.uid,
            email: result.user.email,
        };
    }
);

// Logout(Signout)
export const logout = createAsyncThunk("auth/logout", async () => {
    await signOut(auth);
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export default authSlice.reducer;