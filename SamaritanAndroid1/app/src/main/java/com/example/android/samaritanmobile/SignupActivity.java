package com.example.android.samaritanmobile;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

/**
 * Created by Paulina on 11.12.2018.
 */
public class SignupActivity extends AppCompatActivity {

    private Button loginComeBackButton;
    private Button signUpButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        loginComeBackButton = (Button)findViewById(R.id.btn_link_login_comeback);
        loginComeBackButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(SignupActivity.this, MainActivity.class));
            }
        });

        signUpButton = (Button)findViewById(R.id.btn_signup);
        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //TODO send data to backecnd
                startActivity(new Intent(SignupActivity.this, MainActivity.class));
            }
        });


    }
}
