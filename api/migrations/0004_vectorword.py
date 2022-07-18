# Generated by Django 3.2.9 on 2022-06-14 14:39

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_dailykey'),
    ]

    operations = [
        migrations.CreateModel(
            name='VectorWord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word_text', models.CharField(max_length=255)),
                ('word_vec', django.contrib.postgres.fields.ArrayField(base_field=models.DecimalField(decimal_places=6, max_digits=10), size=300)),
            ],
        ),
    ]