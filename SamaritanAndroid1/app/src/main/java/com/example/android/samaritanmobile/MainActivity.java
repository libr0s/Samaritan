package com.example.android.samaritanmobile;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private TextView emailTV;
    private TextView passwordTV;
    private Button loginButton;
    private Button signupButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        loginButton = (Button)findViewById(R.id.btn_login);
        signupButton = (Button)findViewById(R.id.btn_link_signup);

        emailTV = (TextView)findViewById(R.id.login_input_email);
        passwordTV = (TextView)findViewById(R.id.login_input_password);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String email="";
                String pass="";

                try{
                    email = emailTV.getText().toString();
                    pass = passwordTV.getText().toString();

                }catch (NullPointerException e){
                    e.printStackTrace();
                }

                /*połączenie i wysłanie requestu*//*
                PostLogin postLogin = new PostLogin();
                try {
                    postLogin.connect("u5@wp.pl", "?");
                } catch (IOException e) {
                    e.printStackTrace();
                }*/
                PostRegistration postRegistration = new PostRegistration();
                try {
                    postRegistration.connect("a", "a", "a", "a", "GDANSK");
                } catch (IOException e) {
                    e.printStackTrace();
                }


                GetRegistration get = new GetRegistration();
                get.execute();


                // TODO send and email pass to backend
                startActivity(new Intent(MainActivity.this, UserMainPageActivity.class));
            }
        });
        signupButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, SignupActivity.class));
            }
        });
    }

    @Override
    public void onBackPressed() {

    }
}
