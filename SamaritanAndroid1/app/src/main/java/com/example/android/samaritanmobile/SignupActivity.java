package com.example.android.samaritanmobile;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TableLayout;
import android.widget.TextView;

import java.io.File;

/**
 * Created by Paulina on 11.12.2018.
 */
public class SignupActivity extends AppCompatActivity {

    private static final int REQUEST_GET_SINGLE_FILE = 777;
    private Button loginComeBackButton;
    private Button choosePhotobutton, signUpButton;
    private EditText emailET, loginET, passwordET, nameET, surnameET;
    private TextView avatarStatusTV;
    private Uri avatarPhoto;
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

        choosePhotobutton = (Button)findViewById(R.id.choose_avatar_bttn);
        choosePhotobutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("image/*");
                startActivityForResult(Intent.createChooser(intent, "Select Picture"),REQUEST_GET_SINGLE_FILE);
            }

        });



        signUpButton = (Button)findViewById(R.id.btn_signup);
        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //TODO send data to backecnd
                // pobrać stringi z edittextow
                startActivity(new Intent(SignupActivity.this, MainActivity.class));
            }
        });


    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        try {
            if (resultCode == RESULT_OK) {
                if (requestCode == REQUEST_GET_SINGLE_FILE) {
                    Uri selectedImageUri = data.getData();
                    // Get the path from the Uri
                    final String path = getPathFromURI(selectedImageUri);
                    if (path != null) {
                        File f = new File(path);
                        selectedImageUri = Uri.fromFile(f);
                    }
                    // Set the image in ImageView
                    avatarPhoto = selectedImageUri;
                }
                avatarStatusTV.setText("Wybrano");
            }
        } catch (Exception e) {
            Log.e("FileSelectorActivity", "File select error", e);
        }
    }

    public String getPathFromURI(Uri contentUri) {
        String res = null;
        String[] proj = {MediaStore.Images.Media.DATA};
        Cursor cursor = getContentResolver().query(contentUri, proj, null, null, null);
        if (cursor.moveToFirst()) {
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            res = cursor.getString(column_index);
        }
        cursor.close();
        return res;
    }
}
