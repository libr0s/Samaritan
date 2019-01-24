package com.example.android.samaritanmobile;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

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

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                try{
                    String email = emailTV.getText().toString();
                    String pass = passwordTV.getText().toString();

                }catch (NullPointerException e){

                }

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
