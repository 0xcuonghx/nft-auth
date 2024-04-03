import { ethers } from 'ethers';
import { AuthNft, AuthNft__factory } from '@cuonghx.gu-tech/nft-auth-contracts';
import jwt from 'jsonwebtoken';

export interface NftAuthProps {
  rpcUrl: string;
  contractAddress: string;
  options: {
    jwtSecretKey: string;
    jwtExpiresIn?: string;
  };
}

export interface JwtPayload {
  signerAddress: string;
  contractAddress: string;
}

export interface NftAuthConfig {
  jwt: {
    expiresIn: string | number;
    secretKey: string;
  };
  contractAddress: string;
}

export interface GenerateJwtTokenArgs {
  signedMessage: string;
  signedSignature: string;
  signerAddress: string;
}

export default class NftAuth {
  private _provider: ethers.JsonRpcProvider;
  private _contract: AuthNft;
  private _config: NftAuthConfig;

  constructor({ rpcUrl, contractAddress, options }: NftAuthProps) {
    this._config = {
      jwt: {
        expiresIn: options.jwtExpiresIn || '1d',
        secretKey: options.jwtSecretKey,
      },
      contractAddress,
    };

    this._provider = new ethers.JsonRpcProvider(rpcUrl);
    this._contract = AuthNft__factory.connect(
      this._config.contractAddress,
      this._provider
    );
  }

  public async generateToken({
    signerAddress,
    signedMessage,
    signedSignature,
  }: GenerateJwtTokenArgs): Promise<string> {
    const recoverAddress = ethers.verifyMessage(signedMessage, signedSignature);

    if (recoverAddress !== signerAddress) {
      throw new Error('Invalid signature');
    }

    const isRegistered = await this._contract.isRegistered(signerAddress);

    if (!isRegistered) {
      throw new Error('Unauthorized');
    }

    return this._generateJwtToken({
      signerAddress,
      contractAddress: this._config.contractAddress,
    });
  }

  public verify(jwtToken: string): boolean {
    try {
      jwt.verify(jwtToken, this._jwtSecretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  private _generateJwtToken(payload: JwtPayload): string {
    return jwt.sign(payload, this._jwtSecretKey, {
      expiresIn: this._config.jwt.expiresIn,
    });
  }

  private get _jwtSecretKey(): string {
    return this._config.jwt.secretKey;
  }

  get contract(): AuthNft {
    return this._contract;
  }
}
