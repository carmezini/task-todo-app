'use client';
import React from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';

export default function SignIn() {
	const { data: session } = useSession();

	if (session) {
		return (
            <div>
            </div>
        );
	}

  	return (
		<>
			not sign in
			<button onClick={() => signIn()}>Sign In</button>
		</>
  	)
}
