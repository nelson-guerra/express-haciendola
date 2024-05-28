export interface HasherInterface {
   encrypt: (plaintext: string) => Promise<string>;
   comparePassword: (plaintext: string, encryptedPassword: string) => Promise<boolean>;
}
