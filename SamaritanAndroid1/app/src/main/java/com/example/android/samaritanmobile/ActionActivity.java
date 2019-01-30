package com.example.android.samaritanmobile;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.LatLng;

/**
 * Created by Paulina on 11.12.2018.
 */
public class ActionActivity extends AppCompatActivity {

    private Action action;
    private TextView actionNameTV, actionDateTV, actionDescriptionTV;
    private Button joinActionButton;
    private AlertDialog alert;
    private Fragment mapFragment;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_action);

        Intent i = getIntent();
        action = (Action)i.getSerializableExtra("clickedAction");

        actionNameTV = (TextView) findViewById(R.id.tvActionName);
        actionDateTV = (TextView) findViewById(R.id.tvActionDate);
        actionDescriptionTV = (TextView) findViewById(R.id.tvActionDescription);
        joinActionButton = (Button) findViewById(R.id.bttnJoinAction);

        actionNameTV.setText(action.getName());
        actionDateTV.setText(action.getDate());
        actionDescriptionTV.setText(action.getDescription());




        joinActionButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                final AlertDialog.Builder alertDialog = new AlertDialog.Builder(ActionActivity.this);
                alertDialog.setTitle(DataStorage.doYouWantToJoinAction + "  " + action.getName() +"?");
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

        mapFragment = (Fragment)getSupportFragmentManager().findFragmentById(R.id.mapFragmentAction);
    }

    private void close(){
        alert.dismiss();
    }
}
