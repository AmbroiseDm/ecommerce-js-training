<template>
    <div class="layout">
        <div class="login-page" :class="view">
            <h1 v-if="view === 'login'">Login form</h1>
            <h1 v-if="view === 'register'">Register form</h1>
            <div class="form">
                <div>
                    <template v-if="view === 'register'">
                        <div class="input-wrapper">
                            <label>{{ $t("login.yourName")}}</label>
                            <input
                            name="name"
                            placeholder="First and last name"
                            v-model="name"
                            >
                        </div>
                        <div class="input-wrapper">
                            <label>Address</label>
                            <input
                            name="address"
                            v-model="address"
                            >
                        </div>
                    </template>
                    <div class="input-wrapper">
                        <label>Email</label>
                        <input
                        name="email"
                        type="email"
                        v-model="email"
                        >
                    </div>
                    <div class="input-wrapper">
                        <label for="password">Password</label>
                        <input
                        name="password"
                        type="password"
                        :placeholder="passwordPlaceholder"
                        v-model="password"
                        >
                    </div>
                    <div v-if="view === 'register'" class="input-wrapper">
                        <label for="re-password">Re-enter password</label>
                        <input
                        name="re-password"
                        type="password"
                        v-model="rePassword"                        
                        >                    
                    </div> 
                </div>
                <div>
                    <button class="login-button" @click="auth">{{ buttonLabel }}</button>
                </div>
            </div>
            <div class="change-view-message">
                <p class="center">{{changeViewMessageTxt}}</p>
                <a class="link" @click="toggleView">{{changeViewLinkTxt}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "LoginPage",
    data() {
        return {
            title: "Login page",
            view: "login",
            name: "",
            address: "",
            email: "",
            password: "",
            rePassword: ""
        }
    },
    created() {
        console.log(this.$t)
    },
    computed: {
        buttonLabel() {
            if (this.view === 'login') return 'Login'
            return "Register"
        },
        passwordPlaceholder() {
            if (this.view === 'register') return "At least 6 characters"
        },
        changeViewMessageTxt() {
            if (this.view === 'login') {
                return "New customer? "
            } else {
                return "Already have an account?"
            }
        },
        changeViewLinkTxt() {
            if (this.view === 'login') {
                return "Start here."
            } else {
                return "Sign-in"
            }
        }
    },
    methods: {
        toggleView() {
            if (this.view === 'login') {
                this.view = 'register'
            } else {
                this.view = 'login'
            }
        },
        async auth() {
            if (this.view === 'login') {
                const json = {
                    "email": this.email,
                    "password": this.password
                }
                try {
                    const response = await axios.post('http://localhost:3000/login', json)
                    if (response.data.error == 'ERR001') {
                        console.log('error');
                    } else {
                        localStorage.setItem('token', response.data.token);
                        await this.me();
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("aut => register part");
                const json = {
                    "email": this.email,
                    "password": this.password
                }
                try {
                    const response = await axios.post('http://localhost:3000/register', json)
                    if (response.data.error == 'ERR001') {
                        console.log('error');
                    } else {
                        response.data.token;
                        await localStorage.setItem('token', response.data.token);
                        await this.me();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async me() {
            const json = {
                token: localStorage.getItem('token')
            }
            try {
                const response = await axios.post('http://localhost:3000/me', json)
                console.log("welcomme " + response.data.email);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>