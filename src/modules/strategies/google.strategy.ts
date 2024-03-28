import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { env } from "src/env";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: env.google.clientId || "",
      clientSecret: env.google.clientSecret || "",
      callbackURL: env.google.callbackUrl || "",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken,
    };
    done(null, user);
  }
}
