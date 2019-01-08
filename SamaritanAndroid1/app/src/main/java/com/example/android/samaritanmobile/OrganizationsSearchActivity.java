package com.example.android.samaritanmobile;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.TypedValue;
import android.view.View;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by Paulina on 11.12.2018.
 */
public class OrganizationsSearchActivity extends AppCompatActivity {

    TableLayout organizationsTable;
    int i;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_organizations_search);

        organizationsTable = findViewById(R.id.tableOrganisations);
        final ArrayList<Organization> organizations = loadOrganizations();
        for(i = 0; i < organizations.size(); i++){
            final TableRow tableRow = new TableRow(this);
            TextView tv = new TextView(this);
            tv.setText(organizations.get(i).getName());
            tv.setTextSize(TypedValue.COMPLEX_UNIT_PX,getResources().getDimension(R.dimen.clickable_text_size));
            tableRow.addView(tv);
            tableRow.setTag((int)i);
            int t =(int) getResources().getDimension(R.dimen.table_row_padding);
            tableRow.setPadding(t,t,t,t);
            tableRow.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int id = (int)tableRow.getTag();
                    Organization clickedOrganization = organizations.get(id);
                    Intent i = new Intent(OrganizationsSearchActivity.this, OrganizationPageActivity.class);
                    i.putExtra("clickedOrganization", clickedOrganization);
                    startActivity(i);
                }
            });
            organizationsTable.addView(tableRow);
        }

    }

    private ArrayList<Organization> loadOrganizations() {

        //TODO loading data from backend
        //instead:
        ArrayList<Organization> a = new ArrayList<>();
        a.add(new Organization(1, "Wolontariat", "Bardzo fajna sprawa"));
        a.add(new Organization(2, "OEFL", "Przeprowadzanie przez ulice"));
        a.add(new Organization(3, "Unicef", "Bajki o smutnych programistach"));
        a.add(new Organization(4, "Zbiorki pieniedzy", "Zbieramy na pomoc chorym"));

        return a;
    }
}
