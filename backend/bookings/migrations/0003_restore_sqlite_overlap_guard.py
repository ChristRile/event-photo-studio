from importlib import import_module

from django.db import migrations


def restore_sqlite_overlap_guard(apps, schema_editor):
    if schema_editor.connection.vendor != 'sqlite':
        return

    # SQLite may rebuild the table while adding fields in 0002, dropping its triggers.
    schema_editor.execute('DROP TRIGGER IF EXISTS event_booking_overlap_insert;')
    schema_editor.execute('DROP TRIGGER IF EXISTS event_booking_overlap_update;')
    import_module('bookings.migrations.0001_initial').add_overlap_guard(apps, schema_editor)


class Migration(migrations.Migration):
    dependencies = [
        ('bookings', '0002_event_guest_count_event_notes'),
    ]

    operations = [
        migrations.RunPython(restore_sqlite_overlap_guard, migrations.RunPython.noop),
    ]
