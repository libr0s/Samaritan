package com.example.android.samaritanmobile;

public class Token {
    private static final Token ourInstance = new Token();

    public static Token getInstance() {
        return ourInstance;
    }

    private Token() {
    }

    private String token = "none";

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
