
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Needed for pipes like async, json etc. (even if using @if/@for)
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  registerForm!: FormGroup; 
  submitted = false; 

  userTypes = [
    { value: 'student', label: 'Soy Estudiante' },
    { value: 'tutor', label: 'Soy Tutor' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userType: new FormControl('student', Validators.required), 
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      // Tutor specific fields (initially potentially empty/not required by default)
      subject: new FormControl(''),
      experience: new FormControl(null), // Use null for number inputs
      bio: new FormControl(''),
      // Student specific fields (initially potentially empty/not required by default)
      gradeLevel: new FormControl(''),
      interests: new FormControl('')
    }, { validators: passwordsMatchValidator }); // Add the custom validator at the form group level

    // Add/Remove validators based on userType changes
    this.registerForm.get('userType')?.valueChanges.subscribe(type => {
      this.updateValidators(type);
    });

    // Initial validator setup based on default value
    this.updateValidators(this.registerForm.get('userType')?.value);
  }

  // Helper function to dynamically update validators
  updateValidators(userType: string): void {
    const subjectControl = this.registerForm.get('subject');
    const experienceControl = this.registerForm.get('experience');
    const bioControl = this.registerForm.get('bio');
    const gradeLevelControl = this.registerForm.get('gradeLevel');

    // Clear existing validators first to avoid accumulation
    subjectControl?.clearValidators();
    experienceControl?.clearValidators();
    bioControl?.clearValidators();
    gradeLevelControl?.clearValidators();

    if (userType === 'tutor') {
      // Add required validators for tutor fields
      subjectControl?.setValidators([Validators.required]);
      experienceControl?.setValidators([Validators.required, Validators.min(0)]); // Example: min 0 years
      bioControl?.setValidators([Validators.required, Validators.minLength(20)]); // Example: min 20 chars
    } else if (userType === 'student') {
      // Add required validators for student fields (if any)
      gradeLevelControl?.setValidators([Validators.required]);
       // 'interests' could be optional
    }

    // Update validity for all controls after changing validators
    subjectControl?.updateValueAndValidity();
    experienceControl?.updateValueAndValidity();
    bioControl?.updateValueAndValidity();
    gradeLevelControl?.updateValueAndValidity();
  }


  // Getter for easy access to form controls in the template
  get f() { return this.registerForm.controls; }

  // Getter to check current user type easily in template
  get selectedUserType(): string {
    return this.f['userType'].value;
  }

  // Function to handle form submission
  onSubmit() {
    this.submitted = true;
    console.log('Form Raw Value:', this.registerForm.getRawValue()); // Log raw value
    console.log('Form Status:', this.registerForm.status); // Log status
    console.log('Form Errors:', this.registerForm.errors); // Log form-level errors
    console.log('Control Errors (Subject):', this.f['subject'].errors); // Log specific control errors

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      // Optionally scroll to the first invalid control or show a general error message
      return;
    }

    // Process registration logic here based on user type
    console.log('Registration successful!', this.registerForm.value);
    alert(`Registration successful as ${this.selectedUserType}! Check console for details.`);
    // Implement actual API call here
  }
}
