class DateHelper {
  public getDateFromString(dateString: string): Date | null {
    const normalizedDate = this.normalizeDateString(dateString);
    return normalizedDate ? new Date(normalizedDate) : null;
  }

  public normalizeDateString(dateString: string): string | null {
    let normalizedDate: string | null = this.normalizeDDMMYYYY(dateString)
      || this.normalizeYYYYMMDD(dateString)
      || this.normalizeYYYYMMDDNoSeparator(dateString);

    return this.isValidDate(normalizedDate) ? normalizedDate : null;
  }

  private normalizeDDMMYYYY(dateString: string): string | null {
    const regex = /([0-9]{2})[-/ .]([0-9]{2})[-/ .]([0-9]{4})/;
    const dateMatch = dateString.match(regex);

    if (!dateMatch) return null;

    return `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
  }

  private normalizeYYYYMMDD(dateString: string): string | null {
    const regex = /([0-9]{4})[-/ .]([0-9]{2})[-/ .]([0-9]{2})/;
    const dateMatch = dateString.match(regex);

    if (!dateMatch) return null;

    return `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
  }

  private normalizeYYYYMMDDNoSeparator(dateString: string): string | null {
    const regex = /([0-9]{4})([0-9]{2})([0-9]{2})/;
    const dateMatch = dateString.match(regex);

    if (!dateMatch) return null;

    return `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
  }

  public isValidDate(dateString: string | null): boolean {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}

export { DateHelper };
