from django.urls import path
from . import views

urlpatterns = [
    path('', views.register_view, name='register'),  # 👈 now homepage shows register form
    path('verify/<token>/', views.verify_view, name='verify'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
]
