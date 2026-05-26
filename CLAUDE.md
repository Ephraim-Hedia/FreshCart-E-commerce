# Project Overview

This is a scalable e-commerce frontend application built using:
- Angular 21
- Tailwind CSS
- Angular Signals
- Flowbite when necessary 

The backend already exists and is consumed through REST APIs.

Main goals:
- reusable components
- scalable architecture
- maintainable code
- production-ready frontend
- high performance
- clean UI

# Architecture Rules

- Use feature-based architecture
- Use standalone Angular components
- Prefer composition over inheritance
- Avoid duplicated logic
- Keep components small and reusable
- Separate smart and dumb components

# State Management Rules

- Use Signals for local state
- Prefer computed() over manual synchronization
- Avoid unnecessary effects()
- Keep state close to the feature
- Avoid global state unless necessary

# Styling Rules

- Tailwind only and flowbite when necessary only 
- No inline styles
- Mobile-first responsive design
- Reuse utility patterns
- Extract reusable UI components

# Performance Rules

- Lazy load feature routes
- Avoid unnecessary re-renders
- Optimize image rendering
- Use transform + opacity for animations

# Forbidden

- Do not modify unrelated files
- Do not introduce libraries without approval
- Do not duplicate components
- Do not create giant templates

# Workflow

Before implementation:
1. Analyze architecture
2. Reuse existing patterns
3. Create implementation plan
4. Implement step-by-step