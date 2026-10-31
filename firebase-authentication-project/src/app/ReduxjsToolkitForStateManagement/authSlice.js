import { auth, googleProvider, githubProvider } from "@/utils/firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

// for Signup
// The thunk can receive the whole form object
// Async thunk for email/password signup
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
// Async thunk for email/password login
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

// Async thunk for Google sign-in
export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (_, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            return { uid: userCredential.user.uid, email: userCredential.user.email };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for GitHub sign-in
export const githubLogin = createAsyncThunk(
    'auth/githubLogin',
    async (_, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithPopup(auth, githubProvider);
            return { uid: userCredential.user.uid, email: userCredential.user.email };
        } catch (error) {
            return rejectWithValue(error.message);
        }
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
        // Signup states
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
            
            // Login states
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
            })
            // Google login states
            .addCase(googleLogin.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(googleLogin.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(googleLogin.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            // GitHub login states
            .addCase(githubLogin.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(githubLogin.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(githubLogin.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    },
});

export default authSlice.reducer;