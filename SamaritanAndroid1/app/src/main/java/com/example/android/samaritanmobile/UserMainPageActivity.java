package com.example.android.samaritanmobile;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * Created by Paulina on 11.12.2018.
 */
public class UserMainPageActivity extends AppCompatActivity {


    private ImageView avatar;
    private TextView nameTV, surnameTV, pointsTV, actionsTV, descriptionTV;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_main_page);
        setUserData();
    }

    @Override
    public void onBackPressed() {

    }

    public void rowClick(View view) {
        switch(view.getId()) {
            case R.id.table_row_messages:
                startActivity(new Intent(UserMainPageActivity.this, MessagesActivity.class));
                break;
            case R.id.table_row_my_actions:
                startActivity(new Intent(UserMainPageActivity.this, UserActionsActivity.class));
                break;
            case R.id.table_row_organisations:
                startActivity(new Intent(UserMainPageActivity.this, OrganizationsSearchActivity.class));
                break;
            case R.id.table_row_find_actions:
                startActivity(new Intent(UserMainPageActivity.this, FindActionsActivity.class));
                break;
            case R.id.table_log_out:
                startActivity(new Intent(UserMainPageActivity.this, MainActivity.class));
                break;
        }


    }

    public void setUserData(){
        avatar = (ImageView) findViewById(R.id.ivProfile);
        nameTV = (TextView) findViewById(R.id.tvName);
        surnameTV = (TextView) findViewById(R.id.tvSurname);
        pointsTV = (TextView) findViewById(R.id.tvPoints);
        actionsTV = (TextView) findViewById(R.id.tvActions);
        descriptionTV = (TextView) findViewById(R.id.tvDescription);
        avatar = (ImageView) findViewById(R.id.ivProfile);

        //TODO load data from backend
    }
}
