import { use, serializeUser, deserializeUser } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { find, create } from '../services/user/user.service';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

use(
    new GoogleStrategy({
        // options for the strategy
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:9871/api/v1/auth/google/callback`,
        passReqToCallback: true
    },
        async (request, accessToken, refreshToken, profile, done) => {
            // pass call back function: search for existing profile on db
            await find({ googleId: profile.id }).then(async (existingUser) => {
                if (existingUser) {
                    // Already have the user
                    done(null, existingUser);
                } else {
                    await create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                    }).then((newUser) => {
                        return done(null, newUser);
                    })
                }
            })
        }
    ));

// Serialize user and store in cookie
serializeUser((user, done) => {
    done(null, user.id);
});

deserializeUser((id, done) => {
    find(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        return done(err);
      });
});