from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib.auth.models import User
from .models import Profile
import uuid

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])  # Hash password
            user.save()
            
            # Generate verification token and create profile
            token = str(uuid.uuid4())
            Profile.objects.filter(user=user).update(token=token)
            
            return redirect(f'/verify/{token}/')  # Redirect to verify URL
    else:
        form = RegisterForm()
    
    return render(request, 'register.html', {'form': form})


from django.contrib import messages

def verify_view(request, token):
    profile = Profile.objects.filter(token=token).first()

    if profile:
        profile.is_verified = True
        profile.save()
        messages.success(request, 'Account Verified Successfully ✅')
        return redirect('login')  # We'll make login page next
    else:
        messages.error(request, 'Invalid Verification Link')
        return redirect('/')  # Since homepage is now the register form


from django.contrib.auth import authenticate, login, logout

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            profile = Profile.objects.filter(user=user).first()
            if profile.is_verified:
                login(request, user)
                return redirect('/dashboard/')  # We'll make this view next
            else:
                messages.error(request, 'Account not verified')
        else:
            messages.error(request, 'Invalid credentials')

    return render(request, 'login.html')

from django.contrib.auth.decorators import login_required

@login_required
def logout_view(request):
    logout(request)
    return redirect('/login/')


from django.contrib.auth.decorators import login_required

@login_required(login_url='/login/')
def dashboard_view(request):
    return render(request, 'dashboard.html')


