from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'is_verified', 'token']         # 👈 Shows these columns
    search_fields = ['user__username', 'user__email']       # 👈 Searchable fields
    ordering = ['-is_verified']                             # 👈 Newest unverified first

    fieldsets = (
        ('User Info', {
            'fields': ('user',)
        }),
        ('Verification', {
            'fields': ('is_verified', 'token')
        }),
    )
