package com.example.android.samaritanmobile;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

/**
 * Created by Paulina on 11.12.2018.
 */
public class ActionActivity extends AppCompatActivity {

    private Action action;
    private TextView actionNameTV, actionDateTV, actionDescriptionTV;
    private Button joinActionButton;
    private AlertDialog alert;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_action);

        Intent i = getIntent();
        action = (Action)i.getSerializableExtra("clickedAction");

        actionNameTV = findViewById(R.id.tvActionName);
        actionDateTV = findViewById(R.id.tvActionDate);
        actionDescriptionTV = findViewById(R.id.tvActionDescription);
        joinActionButton = findViewById(R.id.bttnJoinAction);

        actionNameTV.setText(action.getName());
        actionDateTV.setText(action.getDate());
        actionDescriptionTV.setText(action.getDescription());


        joinActionButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final AlertDialog.Builder alertDialog = new AlertDialog.Builder(ActionActivity.this);
                alertDialog.setTitle(DataStorage.doYouWantToJoinAction + "  " + action.getName() +"?");
                alertDialog.setMessage("this is my app");
                alertDialog.setPositiveButton(DataStorage.Yes, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        //TODO - send to backend that user wants to join action
                    }
                });

                alertDialog.setNegativeButton(DataStorage.No, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        close();
                    }
                });
                alert = alertDialog.show();

            }
        });

        if(action.isEnteredFromUserPage()){
            joinActionButton.setVisibility(View.INVISIBLE);
        }
    }

    private void close(){
        alert.dismiss();
    }
}
